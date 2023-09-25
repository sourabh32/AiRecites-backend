import bcrypt from "bcryptjs"

const matchPassword = async (password,hashedPassword) =>{
  const match = await bcrypt.compare(password,hashedPassword)
  

  return match

}

export default matchPassword