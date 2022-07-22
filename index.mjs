import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
console.log('Program Begins..................')
const ctcAlice = accAlice.contract(backend);

const Startbobs = async (name) => {
    const acc = await stdlib.newTestAccount(startingBalance);
    const address = acc.getAddress()
    try {
        const ctc = acc.contract(backend, ctcAlice.getInfo());
        await ctc.apis.Bob.enter_acc();
        console.log(`${name}'s account : ${address} has connected to the contract successfully `)
    } catch (error) {
        console.log(`${name}'s account : ${address} Failed  to connect to the contract `)
    }

}

await Promise.all([
    ctcAlice.p.Alice({
        ready: () => {
            console.log('Alice is ready')
        },
        acc_amt: parseInt(5)
    }),
    await Startbobs('Bob1'),
    await Startbobs('Bob2'),
    await Startbobs('Bob3'),
    await Startbobs('Bob4'),
    await Startbobs('Bob5'),
    await Startbobs('Bob6'),
    await Startbobs('Bob7'),
    await Startbobs('Bob8'),
    process.exit()
]);
