import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeders } from "typeorm-extension";
import { Faker } from "@faker-js/faker";

import { NCDataSource } from "../data_source/datasource";
import { Patient } from "../entity/patient";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const PatientFactory = factoryManager.get(Patient);

    const patients = await PatientFactory.saveMany(10);
  }
}
