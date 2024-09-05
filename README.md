# 🌐 Calculador de IP de Rede
Esse código foi criado para ajudar a calcular o IP de rede para as atividades de Computação e Sistemas Distribuídos em Nuvem.

## Como usar
1. Instalar as dependências do projeto
```bash
npm install
```

2. Iniciar o projeto
```bash
npm run dev
```

3. Inserir o IP e a máscara de sub-rede nas inputs
```bash
Insira um IP: 192.168.1.1
Insira uma máscada de sub-rede (e.g., 255.255.255.0 or /24): /24
```

## O que esperar
Resposta baseado no IP e máscara de sub-rede que você inseriu.
Pegando de examplo os IPs acima:
```bash
Classe: C
CIDR: 192.168.1.1/28
--------------------------
Decimal | Hexadecimal | Octadecimal
Máscara de Sub-rede: 255.255.255.240 | ff.ff.ff.f0 | 11111111111111111111111111110000
Endereço de Rede: 192.168.1.0 | c0.a8.01.00 | 11000000.10101000.00000001.00000000
Endereço de Broadcast: 192.168.1.239 | c0.a8.01.ef | 11000000.10101000.00000001.11101111
Primeiro endereço: 192.168.1.1 | c0.a8.01.01 | 11000000.10101000.00000001.00000001
Último endereço: 192.168.1.238 | c0.a8.01.ee | 11000000.10101000.00000001.11101110
```
