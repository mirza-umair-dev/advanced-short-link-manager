import z, { email } from 'zod'

const registerSchema = z.object({
    name:z.string().min(3,'Name must be atleast 3 characters long!').max(20),
    email:z.string().trim().toLowerCase().email('Invalid Email address!'),
    password:z.string().min(8,'Password must atleast 8 characters')

});


const signinSchema = z.object({
    email:z.string().trim().toLowerCase().email('Invalid Email Address'),
    password:z.string().min(1,'Password is required')
})

const resetPasswordTokenSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});


export {registerSchema,signinSchema,resetPasswordSchema,resetPasswordTokenSchema}