declare module '@ioc:Adonis/Core/Validator' {
   interface Rules {
      gte(min: number): Rule
   }
}
