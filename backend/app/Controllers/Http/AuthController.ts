import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

    public async login({ auth, request, response }: HttpContextContract) {
        await request.validate({
            schema: schema.create({
                email: schema.string({}, [
                    rules.email()
                ]),
                password: schema.string({}, [
                    rules.minLength(6)
                ])
            }),
            messages: {
                'email.required': 'Email tidak boleh kosong',
                'email.email': 'Email tidak valid',
                'password.required': 'Password tidak boleh kosong',
                'password.minLength': 'Password minimal 6 karakter'
            }
        })

        const { email, password } = request.all()
        await auth.use('api').attempt(email, password, {
            expiresIn: '30 mins'
        }).then(async (result) => {
            // result.user
            await result.user.load('role', query => query)
            // data.toJSON()
            const data = result.user.toJSON()
            data.token = result

            return response.ok({
                message: 'success',
                data
            })
        }).catch(() => {
            return response.notFound({
                error: 'User Not Found'
            })
        })
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('api').authenticate()
        await auth.use('api').revoke()
        return response.ok({
            message: 'success'
        })
    }

    public async register({ auth, request, response }: HttpContextContract) {
        const req = request.all()
        await request.validate({
            schema: schema.create({
                name: schema.string(),
                phone: schema.string({}, [
                    rules.mobile(),
                    rules.unique({ table: 'users', column: 'phone' })
                ]),
                email: schema.string({}, [
                    rules.email(),
                    rules.unique({ table: 'users', column: 'email' })
                ]),
                password: schema.string({}, [
                    rules.minLength(6),
                ]),
                confirm: schema.string({}, [
                    rules.minLength(6),
                    rules.confirmed('password')
                ])
            }),
            messages: {
                'name.required': 'Nama tidak boleh kosong',
                'phone.required': 'Nomor HP tidak boleh kosong',
                'phone.mobile': 'Nomor HP tidak valid',
                'phone.unique': 'Nomor HP sudah terdaftar',
                'email.required': 'Email tidak boleh kosong',
                'email.email': 'Email tidak valid',
                'email.unique': 'Email sudah terdaftar',
                'password.required': 'Password tidak boleh kosong',
                'password.minLength': 'Password minimal 6 karakter',
                'password.confirmed': 'Password tidak sama',
                'confirm.minLength': 'Konfirmasi password minimal 6 karakter',
                'confirm.required': 'Konfirmasi password tidak boleh kosong',
            }
        })

        await User.create({
            email: req.email,
            password: req.password,
            phone: req.phone,
            name: req.name,
        }).then(async (user) => {
            await auth.use('api').attempt(req.email, req.password, {
                expiresIn: '30 mins'
            }).then(async (token) => {
                await user.load('role', query => query)
                const data = user.toJSON()
                data.token = token
                return response.created({
                    message: 'success',
                    data,
                })
            }).catch(() => {
                return response.unauthorized({
                    error: 'Invalid credentials'
                })
            })
        }).catch(() => {
            return response.badRequest({
                error: 'Failed to create user'
            })
        })

    }
}
