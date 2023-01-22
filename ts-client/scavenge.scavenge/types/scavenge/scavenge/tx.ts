/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "scavenge.scavenge";

export interface MsgSubmitScavenge {
  creator: string;
  solutionHash: string;
  description: string;
  reward: string;
}

export interface MsgSubmitScavengeResponse {
}

function createBaseMsgSubmitScavenge(): MsgSubmitScavenge {
  return { creator: "", solutionHash: "", description: "", reward: "" };
}

export const MsgSubmitScavenge = {
  encode(message: MsgSubmitScavenge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.solutionHash !== "") {
      writer.uint32(18).string(message.solutionHash);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.reward !== "") {
      writer.uint32(34).string(message.reward);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitScavenge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitScavenge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.solutionHash = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.reward = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitScavenge {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      solutionHash: isSet(object.solutionHash) ? String(object.solutionHash) : "",
      description: isSet(object.description) ? String(object.description) : "",
      reward: isSet(object.reward) ? String(object.reward) : "",
    };
  },

  toJSON(message: MsgSubmitScavenge): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.solutionHash !== undefined && (obj.solutionHash = message.solutionHash);
    message.description !== undefined && (obj.description = message.description);
    message.reward !== undefined && (obj.reward = message.reward);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitScavenge>, I>>(object: I): MsgSubmitScavenge {
    const message = createBaseMsgSubmitScavenge();
    message.creator = object.creator ?? "";
    message.solutionHash = object.solutionHash ?? "";
    message.description = object.description ?? "";
    message.reward = object.reward ?? "";
    return message;
  },
};

function createBaseMsgSubmitScavengeResponse(): MsgSubmitScavengeResponse {
  return {};
}

export const MsgSubmitScavengeResponse = {
  encode(_: MsgSubmitScavengeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitScavengeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitScavengeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSubmitScavengeResponse {
    return {};
  },

  toJSON(_: MsgSubmitScavengeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitScavengeResponse>, I>>(_: I): MsgSubmitScavengeResponse {
    const message = createBaseMsgSubmitScavengeResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SubmitScavenge(request: MsgSubmitScavenge): Promise<MsgSubmitScavengeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SubmitScavenge = this.SubmitScavenge.bind(this);
  }
  SubmitScavenge(request: MsgSubmitScavenge): Promise<MsgSubmitScavengeResponse> {
    const data = MsgSubmitScavenge.encode(request).finish();
    const promise = this.rpc.request("scavenge.scavenge.Msg", "SubmitScavenge", data);
    return promise.then((data) => MsgSubmitScavengeResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
