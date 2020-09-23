import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
const app = express()
app.disable('x-powered-by');

app.use('',swaggerUi.serve, swaggerUi.setup(swaggerDocs))

let port:number;
port = parseInt(process.env.PORT, 10) || 3002
if(process.argv[2]){
    port = parseInt(process.argv[2], 10)
}


app.listen(port, () => {
    console.log("swagger service started on port :", port)
})
