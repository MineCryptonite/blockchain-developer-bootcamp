const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers .utils.parseUnits(n.toString(), 'ether')
}

describe('Token', ()=> {
	let token 
	let accounts
	let deployer

	beforeEach(async () =>{
		//Fetch Token From Blockchain
		const Token = await ethers.getContractFactory('Token')
		token = await Token.deploy('Dapp University', 'DAPP', '1000000')

		accounts = await ethers.getSigners()
		deployer = accounts[0]
	})

	describe('Deployment', () => {
		const name = 'Dapp University'
		const symbol = 'DAPP'
		const decimals = '18'
		const totalSupply = tokens('1000000')

		it('Has correct name', async () => {
			expect(await token.name()).to.equal(name)
		})

		it('Has correct symbol', async () => {
			expect(await token.symbol()).to.equal(symbol)
		})

		it('Has correct decimals', async () => {
			expect(await token.decimals()).to.equal(decimals)
		}) 

		it('Has correct total supply', async () => {
			expect(await token.totalSupply()).to.equal(totalSupply)
		})

		it('Assigns total supply to deployer', async () => {
			expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
		})
	})


})
