import { ModelControls } from "../../types/model-controls";
import { ViewMode } from "../../types/view";
import { ProgramInfo } from "../gl/program-info";
import { WebGlHelper } from "../gl/webgl-helper";
import { WebglSubRenderer } from "./webgl-sub-renderer";

export type WireframeProgramInfo = ProgramInfo<
  'vertexPosition',
  'modelViewMatrix' | 'projectionMatrix' | 'baseColor' | 'entityColor'
>;

export class WireframeRenderer extends WebglSubRenderer<WireframeProgramInfo> {
  protected override getViewMode(): ViewMode {
    return 'wireframe';
  }

  override changeModelControls(modelControls: ModelControls): void {
    this.ctx.setBaseEntityColor(modelControls.wireframeColor);
  }

  protected override initProgram(): WireframeProgramInfo {
    const { vsSource, fsSource } = this.shaderSources.wireframe;

    const vsShader = WebGlHelper.compileShader(this.gl, vsSource, this.gl.VERTEX_SHADER);
    const fsShader = WebGlHelper.compileShader(this.gl, fsSource, this.gl.FRAGMENT_SHADER);
    const shaderProgram = WebGlHelper.createProgram(this.gl, vsShader, fsShader);

    return {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')!,
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')!,
        baseColor: this.gl.getUniformLocation(shaderProgram, 'baseColor')!,
        entityColor: this.gl.getUniformLocation(shaderProgram, 'entityColor')!,
      },
    };
  }
}
