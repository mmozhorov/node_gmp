import { Container } from "inversify";

import { DBInterface, DB } from '../types/db.types';
import { PostgresDB } from '../loaders/postgresql';

const serviceContainer = new Container();

serviceContainer.bind<DBInterface>(DB).to(PostgresDB);

export { serviceContainer };