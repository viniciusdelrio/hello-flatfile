import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelizeConnection from "../configs";

class ClientSpace extends Model<InferAttributes<ClientSpace>, InferCreationAttributes<ClientSpace>> {
    declare clientId: string;
    declare spaceId: string;
}

ClientSpace.init({
        clientId: {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            allowNull: false,
            unique: true
        },
        spaceId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize: sequelizeConnection
    }
)

export default ClientSpace