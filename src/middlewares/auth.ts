/**
 * Ce fichier exporte une fonction dite "middleware" qui permet de vérifier si le token est valide
 *
 * Nous importons donc le package jsonwebtoken qui permet de vérifier la validité du token,
 * ainsi que le package express qui permet de définir le type des paramètres req et res
 */

import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import { Personnel, Role } from "@prisma/client";
import { prisma } from "../app";

export interface RequestWithUser extends Request {
  user: Personnel
}

export async function authenticateToken(req: any, res: Response, next: NextFunction) {
  /**
   * Cette partie permet de récupérer le token dans le header de la requête,
   * en temps normal, notre application cliente devrait envoyer le token dans le header
   * de chaque requête, ce qui permet de vérifier si l'utilisateur est bien authentifié
   * avant de traiter la requête.
   *
   * Pour une raison étrange, tous les headers sont en minuscule, ce qui n'est pas habituel
   */
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).send("Veuillez vous authentifier pour continuer"); // Si le token n'est pas présent, on renvoie une erreur 401

  /**
   * Ici, on utilise directement la méthode verify du package jsonwebtoken pour vérifier
   * la validité du token, si le token n'est pas valide, on renvoie une erreur 403
   * (forbidden), sinon on continue le traitement de la requête, donc la méthode du controlleur
   * associé à la route
   *  */

  try {
    const data: any = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET));

    try {
      const user = await prisma.personnel.findUniqueOrThrow({
        where: {
          id: data.user_id
        },
        include: {
          role: true
        }
      }) // !! On stocke l'utilisateur dans la requête pour pouvoir le récupérer dans le controlleur !!
      req.user = user;
    } catch (prismaError) {
      console.error("Error retrieving user from database, the token may have been tampered with... : ", prismaError)
      return res.status(500).send({ error: "Database error" });
    }

    next();
  } catch (jwtError) {
    console.error("Error verifying JWT: ", jwtError)
    return res.status(403).send({ error: "Invalid token" });
  }
}

export function permit(roles: string[]) {

  return (request: any, response: Response, next: NextFunction) => {
    const { user } = request
    if (user && roles.includes(user.role.libelle)) {
      next();
    } else {
      response.status(403).json({ message: "Mauvais rôle !!" })
    }
  }
}
