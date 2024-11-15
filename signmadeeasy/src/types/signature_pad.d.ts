declare module "signature_pad" {
    class SignaturePad {
      constructor(canvas: HTMLCanvasElement, options?: SignaturePad.Options);
      clear(): void;
      isEmpty(): boolean;
      toDataURL(type?: string, encoderOptions?: number): string;
      toData(): SignaturePad.PointGroup[];
      fromData(data: SignaturePad.PointGroup[], options?: { clear?: boolean }): void;
      fromDataURL(dataUrl: string, options?: { ratio?: number, width?: number, height?: number, xOffset?: number, yOffset?: number }): void;
      off(): void;
      on(): void;
  
      // Event listeners
      addEventListener(event: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void;
    }
  
    namespace SignaturePad {
      export interface Point {
        x: number;
        y: number;
        time: number;
      }
  
      export interface PointGroup extends Array<Point> {}
  
      export interface Options {
        dotSize?: number | ((context: CanvasRenderingContext2D) => number);
        minWidth?: number;
        maxWidth?: number;
        throttle?: number;
        minDistance?: number;
        backgroundColor?: string;
        penColor?: string;
        velocityFilterWeight?: number;
        canvasContextOptions?: CanvasRenderingContext2DSettings;
      }
    }
  
    export = SignaturePad;
  }