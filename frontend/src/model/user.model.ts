interface UserType {
    id?: number,
    name: string,
    email: string,
    email_verified_at: Date,
    password: string,
    remember_token: string,
    create_at: Date,
    update_at: Date,
}
export default UserType;