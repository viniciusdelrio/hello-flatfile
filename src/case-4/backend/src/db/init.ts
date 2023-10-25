import ClientSpace from "./models/ClientSpace"

const dbInit = () => {
    ClientSpace.sync({alter: true});
}

export default dbInit