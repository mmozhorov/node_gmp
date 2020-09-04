import { Container } from "inversify";

import { DBInterface, DB } from '../types/db.types';
import { LoggerInterface, Logger } from '../types/logger.types';

import { PostgresDB } from '../loaders/postgresql';
import { CLILogger } from '../loaders/cli-logger';

const serviceContainer = new Container();

serviceContainer.bind<DBInterface>(DB).to(PostgresDB);
serviceContainer.bind<LoggerInterface>(Logger).to(CLILogger);

export { serviceContainer };