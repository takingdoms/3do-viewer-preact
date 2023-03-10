import { GlIndexBuffer } from "./buffer/gl-index-buffer";
import { GlNormalBuffer } from "./buffer/gl-normal-buffer";
import { GlPositionBuffer } from "./buffer/gl-position-buffer";
import { GlTextureCoordBuffer } from "./buffer/gl-texture-coord-buffer";
import { GlContext } from "./gl-context";

export class GlModel {
  private positionBuffer: GlPositionBuffer;
  private indexBuffer: GlIndexBuffer;
  private normalBuffer?: GlNormalBuffer;
  private textureCoordsBuffer?: GlTextureCoordBuffer;
  private textureKey: string | null = null;

  constructor(
    positionBuffer: GlPositionBuffer,
    indexBuffer: GlIndexBuffer,
    normalBuffer?: GlNormalBuffer,
    textureCoordsBuffer?: GlTextureCoordBuffer,
  ) {
    this.positionBuffer = positionBuffer;
    this.indexBuffer = indexBuffer;
    this.normalBuffer = normalBuffer;
    this.textureCoordsBuffer = textureCoordsBuffer;
  }

  setTextureKey(textureKey: string) {
    this.textureKey = textureKey;
  }

  getTextureKey() {
    return this.textureKey;
  }

  usesNormals() {
    return this.normalBuffer !== undefined;
  }

  draw(ctx: GlContext) {
    const textureOk = ctx.useTexture(this.textureKey);

    if (!textureOk) {
      return;
    }

    this.positionBuffer.use();
    this.indexBuffer.use();

    if (this.normalBuffer !== undefined) {
      this.normalBuffer.use();
    }

    if (this.textureCoordsBuffer !== undefined) {
      this.textureCoordsBuffer.use();
    }

    ctx.drawElements(this.indexBuffer.getLength());
  }
}
