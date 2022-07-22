'reach 0.1'
export const main = Reach.App(() => {
    const Alice = Participant('Alice', {
        ready: Fun([], Null),
        acc_amt: UInt
    })
    const Bob = API('Bob', {
        enter_acc: Fun([], Null),
    })
    init()
    Alice.only(() => {
        interact.ready()
        const accs_amt = declassify(interact.acc_amt)
    })

    Alice.publish(accs_amt)

    const [counter] =
        parallelReduce([accs_amt])
            .invariant(balance() == 0)
            .while(counter >= 0)
            .api(Bob.enter_acc,
                (a) => {
                    a(null);
                    return [counter - 1];
                })

    commit()
    exit()
})
