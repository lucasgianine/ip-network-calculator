import * as readline from 'readline'

// Transforma o ip em binário
function ipToBinary(ip: string): string {
  return ip.split('.').map(oct => parseInt(oct).toString(2).padStart(8, '0')).join('.')
}

// Tranforma o ip em hexadecimal
function ipToHex(ip: string): string {
  return ip.split('.').map(oct => parseInt(oct).toString(16).padStart(2, '0')).join('.')
}

// Recebe o endereço de IP e máscara de sub-rede para calcular os detalhes do IP
function calculateNetworkDetails(ipAddress: string, subnetMask: string): void {
  const ipBinary = ipToBinary(ipAddress)
  const maskBits = subnetMask.includes('/') ? parseInt(subnetMask.split('/')[1]) :
    ipToBinary(subnetMask).replace(/[^1]/g, '').length
  const subnetMaskBinary = '1'.repeat(maskBits).padEnd(32, '0')
  const subnetMaskDecimal = subnetMaskBinary.match(/.{8}/g)?.map(b => parseInt(b, 2).toString()).join('.')
  const subnetMaskHex = ipToHex(subnetMaskDecimal ?? '')

  const networkAddressBinary = ipBinary.split('.').map((oct, i) => {
    return (parseInt(oct, 2) & parseInt(subnetMaskBinary.substring(i * 9, i * 9 + 8), 2)).toString(2).padStart(8, '0')
  }).join('.')
  const networkAddressDecimal = networkAddressBinary.split('.').map(binary => parseInt(binary, 2).toString()).join('.')
  const networkAddressHex = ipToHex(networkAddressDecimal)

  const broadcastAddressBinary = ipBinary.split('.').map((oct, i) => {
    return (parseInt(oct, 2) | ~parseInt(subnetMaskBinary.substring(i * 9, i * 9 + 8), 2) & 0xFF).toString(2).padStart(8, '0')
  }).join('.')
  const broadcastAddressDecimal = broadcastAddressBinary.split('.').map(b => parseInt(b, 2).toString()).join('.')
  const broadcastAddressHex = ipToHex(broadcastAddressDecimal)

  const firstAddressDecimal = networkAddressDecimal.split('.').map((oct, i, arr) =>
    i === arr.length - 1 ? (parseInt(oct) + 1).toString() : oct).join('.')
  const lastAddressDecimal = broadcastAddressDecimal.split('.').map((oct, i, arr) =>
    i === arr.length - 1 ? (parseInt(oct) - 1).toString() : oct).join('.')

  const firstAddressHex = ipToHex(firstAddressDecimal)
  const lastAddressHex = ipToHex(lastAddressDecimal)

  const firstAddressBinary = ipToBinary(firstAddressDecimal)
  const lastAddressBinary = ipToBinary(lastAddressDecimal)

  console.log(`Classe: ${determineClass(ipAddress)}`)
  console.log(`CIDR: ${ipAddress}/${maskBits}`)
  console.log('--------------------------')
  console.log('Decimal | Hexadecimal | Octadecimal')
  console.log(`Máscara de Sub-rede: ${subnetMaskDecimal} | ${subnetMaskHex} | ${subnetMaskBinary}`)
  console.log(`Endereço de Rede: ${networkAddressDecimal} | ${networkAddressHex} | ${networkAddressBinary}`)
  console.log(`Endereço de Broadcast: ${broadcastAddressDecimal} | ${broadcastAddressHex} | ${broadcastAddressBinary}`)
  console.log(`Primeiro endereço: ${firstAddressDecimal} | ${firstAddressHex} | ${firstAddressBinary}`)
  console.log(`Último endereço: ${lastAddressDecimal} | ${lastAddressHex} | ${lastAddressBinary}`)
}

function determineClass(ip: string): string {
  const firstOctet = parseInt(ip.split('.')[0])
  if (firstOctet >= 0 && firstOctet <= 127) return 'A'
  if (firstOctet >= 128 && firstOctet <= 191) return 'B'
  if (firstOctet >= 192 && firstOctet <= 223) return 'C'
  if (firstOctet >= 224 && firstOctet <= 239) return 'D'
  return 'E'
}

// Utiliza lib nativa para criar interface interativa com o usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Insira um IP: ', (ipHost) => {
  rl.question('Insira uma máscada de sub-rede (e.g., 255.255.255.0 or /24): ', (maskSubnet) => {

    if (maskSubnet.startsWith('/')) {
      const bits = parseInt(maskSubnet.replace('/', ''), 10)
      const subnetMaskBinary = '1'.repeat(bits).padEnd(32, '0')
      maskSubnet = ipToBinary(subnetMaskBinary)
    }

    calculateNetworkDetails(ipHost, maskSubnet)

    rl.close()
  })
})
