import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import User from './models/userModel.js'
import Role from './models/roleModel.js'
import connectDB from './config/db.js'

dotenv.config()

const createAdmin = async () => {
    try {
        await connectDB()

        let adminRole = await Role.findOne({ role_name: 'admin' })
        if (!adminRole) {
            adminRole = await Role.create({ role_name: 'admin' })
            console.log('Admin role created.')
        }

        const email = 'admin@gmail.com'
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            console.log(`User with email ${email} already exists. Updating password and role...`)
            existingUser.password = 'admin@1234'
            existingUser.role_id = adminRole._id
            existingUser.status = 'active'
            existingUser.isEmailVerified = true
            await existingUser.save()
            console.log('Admin user updated successfully.')
        } else {
            const adminUser = new User({
                username: 'admin',
                full_name: 'System Administrator',
                email: email,
                password: 'admin@1234',
                phone: '0987654321',
                role_id: adminRole._id,
                status: 'active',
                isEmailVerified: true
            })

            await adminUser.save()
            console.log('Admin user created successfully.')
        }

        process.exit()
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

createAdmin()
