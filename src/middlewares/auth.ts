/**
 * Ce fichier exporte une fonction dite "middleware" qui permet de vérifier si le token est valide
 *
 * Nous importons donc le package jsonwebtoken qui permet de vérifier la validité du token,
 * ainsi que le package express qui permet de définir le type des paramètres req et res
 */

import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

function authenticateToken(req: any, res: Response, next: NextFunction) {
  /**
   * Cette partie permet de récupérer le token dans le header de la requête,
   * en temps normal, notre application cliente devrait envoyer le token dans le header
   * de chaque requête, ce qui permet de vérifier si l'utilisateur est bien authentifié
   * avant de traiter la requête.
   *
   * Pour une raison étrange, tous les headers sont en minuscule, ce qui n'est pas habituel
   */
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Le header authorization contient souvent le préfixe "Bearer" suivi du token, on le supprime ici
  if (token == null)
    return res.status(401).send("Veuillez vous authentifier pour continuer"); // Si le token n'est pas présent, on renvoie une erreur 401

  /**
   * Ici, on utilise directement la méthode verify du package jsonwebtoken pour vérifier
   * la validité du token, si le token n'est pas valide, on renvoie une erreur 403
   * (forbidden), sinon on continue le traitement de la requête, donc la méthode du controlleur
   * associé à la route
   *  */
  jwt.verify(
    token,
    String(process.env.ACCESS_TOKEN_SECRET),
    (err: any, user: any) => {
      if (err)
        return res
          .status(403)
          .send("Session expirée, veuillez vous reconnecter");
      req.user = user; // !! On stocke l'utilisateur dans la requête pour pouvoir le récupérer dans le controlleur !!
      next();
    }
  );
}

export default authenticateToken;
