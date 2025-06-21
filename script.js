//1Використати деструктуризацію об’єктів у всіх завданнях з попередньої ДЗ
// Завдання 1
let user = {
	name: 'Nikita',
	age: 12,
	hobby: 'reading',
	premium: true,
}

// user.mood = 'happy'
// user.hobby = 'skydiving'
// user.premium = false
user = {
	...user,
	mood: 'happy',
	hobby: 'skydiving',
	premium: false,
}
for (const key of Object.keys(user)) {
	const { [key]: value } = user
	console.log(`${key}: ${value}`)
}
// Завдання 2
function countProps(obj) {
	const keys = Object.keys(obj)
	const { length } = keys
	return length
}

console.log('кількість властивостей:', countProps(user))

// Завдання 3
function findBestEmployee(employees) {
	let bestName = ''
	let maxTasks = 0

	for (const [name, tasks] of Object.entries(employees)) {
		if (tasks > maxTasks) {
			maxTasks = tasks
			bestName = name
		}
	}

	return bestName
}

const team = {
	Ann: 29,
	David: 35,
	Helen: 1,
	Lorence: 99,
}
console.log(findBestEmployee(team))

// Завдання 4
function countTotalSalary(employees) {
	let total = 0
	for (const salary of Object.values(employees)) {
		total += salary
	}
	return total
}

const salaries = {
	John: 1000,
	Ann: 1500,
	Pete: 2500,
}
console.log(countTotalSalary(salaries))

// Завдання 5
function getAllPropValues(arr, prop) {
	const result = []

	for (const obj of arr) {
		if (prop in obj) {
			result.push(obj[prop])
		}
	}

	return result
}

const products = [
	{ name: 'Radar', price: 1300, quantity: 4 },
	{ name: 'Scanner', price: 2700, quantity: 3 },
	{ name: 'Droid', price: 400, quantity: 7 },
	{ name: 'Grip', price: 1200, quantity: 9 },
]

console.log(getAllPropValues(products, 'name'))
console.log(getAllPropValues(products, 'quantity'))

// Завдання 6
function calculateTotalPrice(allProducts, productName) {
	let total = 0

	for (const product of allProducts) {
		const { name, price, quantity } = product
		if (name === productName) {
			total = price * quantity
			break
		}
	}

	return total
}

console.log(calculateTotalPrice(products, 'Radar'))
console.log(calculateTotalPrice(products, 'Grip'))

//2. Напиши сценарій керування особистим кабінетом інтернет-банку. Є об'єкт account в якому необхідно реалізувати методи для роботи з балансом та історією транзакцій.
/*
 * Типів транзацкій всього два.
 * Можна покласти або зняти гроші з рахунку.
 */
const Transaction = {
	DEPOSIT: 'deposit',
	WITHDRAW: 'withdraw',
}

/*
 * Кожна транзакція - це об'єкт з властивостями: id, type і amount
 */
const account = {
	// Поточний баланс рахунку
	balance: 0,

	// Історія транзакцій

	transactions: [],
	/*
	 * Метод створює і повертає об'єкт транзакції.
	 * Приймає суму і тип транзакції.
	 */
	id: 1,
	createTransaction(amount, type) {
		const newTransaction = {
			amount: amount,
			type: type,
			id: this.id,
		}
		this.id += 1
		return newTransaction
	},
	/*
	 * Метод відповідає за додавання суми до балансу.
	 * Приймає суму танзакції.
	 * Викликає createTransaction для створення об'єкта транзакції
	 * після чого додає його в історію транзакцій
	 */
	deposit(amount) {
		this.balance += amount
		const transaction = this.createTransaction(amount, Transaction.DEPOSIT)
		this.transactions.push(transaction)
		return `добавили ${amount} грошей`
	},

	/*
	 * Метод відповідає за зняття суми з балансу.
	 * Приймає суму танзакції.
	 * Викликає createTransaction для створення об'єкта транзакції
	 * після чого додає його в історію транзакцій.
	 *
	 * Якщо amount більше, ніж поточний баланс, виводь повідомлення
	 * про те, що зняття такої суми не можливо, недостатньо коштів.
	 */
	withdraw(amount) {
		if (amount > this.balance) {
			return 'недостатн коштив на баланцi'
		}
		this.balance -= amount
		const transaction = this.createTransaction(amount, Transaction.WITHDRAW)
		this.transactions.push(transaction)
		return `списали ${amount} грошей`
	},

	/*
	 * Метод повертає поточний баланс
	 */
	getBalance() {
		return `на балансе ${this.balance} коштив`
	},
	/*
	 * Метод шукає і повертає об'єкт транзакції по id
	 */
	getTransactionDetails(id) {
		for (const element of this.transactions) {
			if (id === element.id) {
				return element
			}
		}
		return `таково id небывает`
	},

	/*

   * Метод повертає кількість коштів
   * певного типу транзакції з усієї історії транзакцій
   */
	getTransactionTotal(type) {
		let total = 0
		for (const element of this.transactions) {
			if (type === element.type) {
				// console.log(element)

				total += element.amount
			}
		}
		return `загальна сума по вашому типу транзакций ${type}:${total}`
	},
}

console.log(account.deposit(12))
console.log(account.deposit(135))
console.log(account.withdraw(50))
console.log(account.withdraw(97))
console.log(account.deposit(13))
console.log(account.withdraw(1))
// console.log(account.balance)
console.log(account)

console.log(account.getTransactionDetails(7))
console.log(account.getTransactionTotal(Transaction.DEPOSIT))
console.log(account.getTransactionTotal(Transaction.WITHDRAW))

console.log(account.deposit(11001))

console.log(account.withdraw(234234234))
console.log(account.getBalance())
