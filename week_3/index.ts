import { DBServiceInstance } from './services/DBService';

(async function main() {
    try{
        await DBServiceInstance.connect();
        console.log("Success");
    }
    catch (error) {
        console.error(error);
    }
}());