/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

// import { string } from '@ioc:Adonis/Core/Helpers'
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('gte', (value, [min], options) => {
   if (typeof value !== 'number') {
      return
   }
   if (!(value >= min)) {
      options.errorReporter.report(
         options.pointer,
         'gte',
         `${options.pointer} must be greater than or equal to ${min}`,
         options.arrayExpressionPointer
      )
   }
})
