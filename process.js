console.log (process.argv.slice(2))
import  { Command } from 'commander'

const program = new Command()

program 
    .option('-d', 'variable para debug', false)
    .option('-p <port>', 'puerto del servidor', 8080)
    .option('--mode','modo de trabajo del server', 'production')
    .option('-u <user>', 'usuario utilizando el app', 'no se ha declarado el user')
    .option('-l, -- letters [letters...]','specify letter')
    .parse()

console.log('Options:', program.opts())
console.log ('Options:', program.args)

