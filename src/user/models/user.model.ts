import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User, UserRole } from "generated/prisma/client";
import { BaseModel } from "src/common/models/base.model";

registerEnumType(UserRole, {
    name: 'userRole',
})

@ObjectType({
    description: 'user model',
})
export class UserModel extends BaseModel implements User {
    @Field(() => String, {
        nullable: false,
        defaultValue: 'bob',
        description: 'user name'
    })
    name: string

    @Field(() => String, {
        nullable: false,
        defaultValue: 'bob',
        description: 'user email'
    })
    email: string

    @Field(() => String, {
        nullable: false,
        defaultValue: 'bob',
        description: 'user password'
    })
    password: string

    @Field(() => UserRole, {
        nullable: false,
        defaultValue: 'bob',
        description: 'user role'
    })
    role: UserRole
}