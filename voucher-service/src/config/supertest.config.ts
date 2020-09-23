import supertest from "supertest";
import {app} from "../index.es6";

export const superTestRequest = supertest(app);
