// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgRevealSolution } from "./types/scavenge/scavenge/tx";
import { MsgSubmitScavenge } from "./types/scavenge/scavenge/tx";
import { MsgCommitSolution } from "./types/scavenge/scavenge/tx";


export { MsgRevealSolution, MsgSubmitScavenge, MsgCommitSolution };

type sendMsgRevealSolutionParams = {
  value: MsgRevealSolution,
  fee?: StdFee,
  memo?: string
};

type sendMsgSubmitScavengeParams = {
  value: MsgSubmitScavenge,
  fee?: StdFee,
  memo?: string
};

type sendMsgCommitSolutionParams = {
  value: MsgCommitSolution,
  fee?: StdFee,
  memo?: string
};


type msgRevealSolutionParams = {
  value: MsgRevealSolution,
};

type msgSubmitScavengeParams = {
  value: MsgSubmitScavenge,
};

type msgCommitSolutionParams = {
  value: MsgCommitSolution,
};


export const registry = new Registry(msgTypes);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgRevealSolution({ value, fee, memo }: sendMsgRevealSolutionParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgRevealSolution: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgRevealSolution({ value: MsgRevealSolution.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgRevealSolution: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgSubmitScavenge({ value, fee, memo }: sendMsgSubmitScavengeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSubmitScavenge: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSubmitScavenge({ value: MsgSubmitScavenge.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSubmitScavenge: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCommitSolution({ value, fee, memo }: sendMsgCommitSolutionParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCommitSolution: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCommitSolution({ value: MsgCommitSolution.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCommitSolution: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgRevealSolution({ value }: msgRevealSolutionParams): EncodeObject {
			try {
				return { typeUrl: "/scavenge.scavenge.MsgRevealSolution", value: MsgRevealSolution.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgRevealSolution: Could not create message: ' + e.message)
			}
		},
		
		msgSubmitScavenge({ value }: msgSubmitScavengeParams): EncodeObject {
			try {
				return { typeUrl: "/scavenge.scavenge.MsgSubmitScavenge", value: MsgSubmitScavenge.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSubmitScavenge: Could not create message: ' + e.message)
			}
		},
		
		msgCommitSolution({ value }: msgCommitSolutionParams): EncodeObject {
			try {
				return { typeUrl: "/scavenge.scavenge.MsgCommitSolution", value: MsgCommitSolution.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCommitSolution: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			ScavengeScavenge: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;