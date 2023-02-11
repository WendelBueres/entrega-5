import type { Config } from "@jest/types";
import { exec } from "node:child_process";
import dotenv from "dotenv";
import NodeEnvironment from "jest-environment-node";
import { Client } from "pg";
import util from "node:util";
import crypto from "node:crypto";

dotenv.config({ path: ".env" });

const execSync = util.promisify(exec);

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: Config.ProjectConfig) {
    super(config);

    const dbURL = process.env.DATABASE_URL;
    let db = "";
    const schemaIndex = dbURL?.search("schema");

    this.schema = `test_${crypto.randomUUID()}`;

    if (schemaIndex) {
      db = dbURL?.slice(0, schemaIndex) + "schema=" + this.schema;
    } else {
      db = dbURL + "schema=" + this.schema;
    }

    this.connectionString = db;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`prisma migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
