'use server'

import { LoginInput, RegisterInput, loginSchema, registerSchema } from '@/validators/auth'
import { User } from '@/types/db'
import { generateId } from '@/utils/generate-id'
import { cookies } from 'next/headers'
import { safeJson } from '@/utils/safeJson'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

async function setAuthCookie(user: User) {
  const cookieStore = await cookies()
  cookieStore.set('auth_token', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })
}

export async function loginAction(data: LoginInput) {
  const result = loginSchema.safeParse(data)
  if (!result.success) return { success: false, error: 'Dữ liệu không hợp lệ' }

  const endpoint = `${API_URL}/users?email=${data.email}&password=${data.password}`

  try {
    const res = await fetch(endpoint, { cache: 'no-store' })
    const users = await safeJson<User[]>(res, endpoint)

    if (users.length === 0) {
      return { success: false, error: 'Email hoặc mật khẩu không đúng' }
    }

    const user = users[0]
    if (!user.isActive) {
      return { success: false, error: 'Tài khoản đã bị khóa' }
    }

    await setAuthCookie(user)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...withoutPass } = user
    return { success: true, user: withoutPass }
  } catch (error) {
    console.error('Login Error:', error)
    return { success: false, error: 'Lỗi kết nối server hoặc JSON không hợp lệ' }
  }
}

export async function registerAction(data: RegisterInput) {
  const result = registerSchema.safeParse(data)
  if (!result.success) return { success: false, error: 'Dữ liệu không hợp lệ' }

  const checkEndpoint = `${API_URL}/users?email=${data.email}`

  try {
    const checkRes = await fetch(checkEndpoint, { cache: 'no-store' })
    const existingUsers = await safeJson<User[]>(checkRes, checkEndpoint)

    if (existingUsers.length > 0) {
      return { success: false, error: 'Không thể đăng ký với thông tin đã cung cấp' }
    }

    const newUser: User = {
      id: generateId('user'),
      email: data.email,
      username: data.username,
      password: data.password,
      role: 'user',
      isActive: true,
      phoneNumber: '',
      createdAt: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/150?u=${data.email}`
    }

    const createEndpoint = `${API_URL}/users`
    const createRes = await fetch(createEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })

    if (!createRes.ok) {
      return { success: false, error: 'Không thể tạo tài khoản' }
    }

    const createdUser = await safeJson<User>(createRes, createEndpoint)
    await setAuthCookie(createdUser)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...withoutPass } = createdUser
    return { success: true, user: withoutPass }
  } catch (error) {
    console.error('Register Error:', error)
    return { success: false, error: 'Lỗi kết nối server hoặc JSON không hợp lệ' }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
  return { success: true }
}
