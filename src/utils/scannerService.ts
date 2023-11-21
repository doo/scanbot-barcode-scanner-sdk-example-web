import ScanbotSDK from "scanbot-web-sdk";
import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import { InitializationOptions } from "scanbot-web-sdk/@types/model/configuration/initialization-options";
import toastService from "./toastService";

class ScannerService {
  private scanbotSDK: ScanbotSDKType | null = null;
  private scanner: IBarcodeScannerHandle | null = null;

  async initialize(options: InitializationOptions): Promise<ScanbotSDK> {
    try {
      const sdkInstance = await ScanbotSDK.initialize(options);
      this.scanbotSDK = sdkInstance;
      return sdkInstance;
    } catch (error) {
      console.error("Failed to initialize Scanbot SDK:", error);
      return Promise.reject(`Failed to initialize Scanbot SDK: ${error}`);
    }
  }

  dispose() {
    this.scanner?.dispose();
  }

  getScanbotSDK() {
    return this.scanbotSDK;
  }

  getScanner() {
    return this.scanner;
  }

  async createBarcodeScanner(
    configuration: BarcodeScannerConfiguration
  ): Promise<IBarcodeScannerHandle> {
    if (!this.scanbotSDK) {
      toastService.showErrorMessage("Scanbot SDK not initialized.");
      return Promise.reject("Scanbot SDK not initialized.");
    }

    try {
      const scanner = await this.scanbotSDK.createBarcodeScanner(configuration);
      this.scanner = scanner;
      return scanner;
    } catch (error) {
      console.error("Failed to create Barcode Scanner:", error);
      return Promise.reject(`Failed to create Barcode Scanner: ${error}`);
    }
  }
}

const scannerService = new ScannerService();

export { scannerService };
