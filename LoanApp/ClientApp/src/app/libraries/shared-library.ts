export class SharedLibrary {
    private randomize(length: number) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public generateTransactionNumber(){
        const randomLength = 5;
        const prefixNumber = this.randomize(randomLength);
        let date = new Date();
        let transactionNumber = date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        '-' + prefixNumber;
        return transactionNumber;
    }
}