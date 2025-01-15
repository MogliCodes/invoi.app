import consola from "consola";

type AllowedMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type ApiResources =
  | "invoices"
  | "invoice"
  | "clients"
  | "items"
  | "users"
  | "services";

interface ApiClientConfig {
  baseUrl: string;
}

const runtimeConfig = useRuntimeConfig();

export default class ApiClientBuilder {
  private method: AllowedMethods | undefined;
  private resource: ApiResources | string | undefined;
  private endpoint: string;
  private config: ApiClientConfig;
  private params: Record<string, string>;
  private headers: Record<string, string>;
  private body: any;

  constructor(config?: ApiClientConfig) {
    this.config = config || {
      baseUrl: runtimeConfig.public.BACKEND_BASE_URL + "/restapi",
    };
    this.method = undefined;
    this.resource = undefined;
    this.endpoint = "";
    this.params = {};
    this.headers = {};
    this.body = undefined;
  }

  setMethod(method: AllowedMethods): this {
    this.method = method;
    return this;
  }

  get(): this {
    return this.setMethod("GET");
  }

  post(): this {
    return this.setMethod("POST");
  }

  patch(): this {
    return this.setMethod("PATCH");
  }

  put(): this {
    return this.setMethod("PUT");
  }

  delete(): this {
    return this.setMethod("DELETE");
  }

  setResource(resource: ApiResources | string): this {
    this.resource = resource;
    return this;
  }

  setEndpoint(endpoint: string): this {
    this.endpoint = endpoint;
    return this;
  }

  addParam(key: string, value: string): this {
    if (Object.keys(this.params).length === 0) {
      this.params = { [key]: value };
    }
    this.params = { ...this.params, [key]: value };
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.headers = headers;
    return this;
  }

  setBody(body: any): this {
    this.body = body;
    return this;
  }

  private buildUrl(): string {
    if (!this.resource) {
      throw new Error("Resource is not set");
    }

    let url = `${this.config.baseUrl}/${this.resource}`;
    if (this.endpoint) {
      url += `/${this.endpoint}`;
    }

    const paramString = Object.entries(this.params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    if (paramString) {
      url += `?${paramString}`;
    }

    return url;
  }

  async execute(): Promise<any> {
    if (!this.method) {
      throw new Error("Method is not set");
    }

    const url = this.buildUrl();
    const options: RequestInit = {
      method: this.method,
    };
    consola.info(`${this.method} ${url}`);
    let response;
    try {
      response = await $fetch(url, {
        method: this.method,
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.body),
      });
      if (!response) {
        throw new Error(`Request failed with status ${response}`);
      }
    } catch (error) {
      consola.error(error);
    }
    return response;
  }
}
