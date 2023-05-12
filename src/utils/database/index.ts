import prisma from "./database"

export async function initAdmin() {
    const admin = await prisma.user.findFirst({
        where: {
            username: "admin"
        }
    })

    if (!admin) {
        console.log("admin not found, creating admin")
        let result = await prisma.user.create({
            data: {
                username: "admin",
                password: "admin",
                role: "ADMIN"
            }
        })
        console.log("admin created", result)
    }
    return admin
}
