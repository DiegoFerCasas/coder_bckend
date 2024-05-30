import bcrypt from 'bcrypt'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const validPass = (password, user) => bcrypt.compareSync(password, user.password)

