import type { OnlyWritableNonFunctionProps, OnlyWritableNonFunctionPropsPlus, PropBlackList } from "./types-extra"
import type { Quaternion, Vector3, Euler, Matrix4, Mesh, WebGLRenderer } from "three"

export type WebGLRendererProps = OnlyWritableNonFunctionProps<Omit<WebGLRenderer, PropBlackList>>

export type MeshProps = OnlyWritableNonFunctionPropsPlus<
	Omit<Mesh, PropBlackList>,
	{
		position?: Vector3 | Parameters<Vector3["set"]>
		scale?: Vector3 | Parameters<Vector3["set"]>
		rotation?:
			| Euler
			| Parameters<Euler["set"]>
			| Quaternion
			| Parameters<Quaternion["set"]>
			| Vector3
			| Parameters<Vector3["set"]>
		quaternion?: Quaternion | Parameters<Quaternion["set"]>
		matrix?: Matrix4 | Parameters<Matrix4["set"]>
	}
>

export type ButtonProp = {
	[P in keyof OnlyWritableNonFunctionProps<HTMLButtonElement>]: OnlyWritableNonFunctionProps<HTMLButtonElement>[P]
}
export type LinkProp = {
	[P in keyof OnlyWritableNonFunctionProps<HTMLAnchorElement>]: OnlyWritableNonFunctionProps<HTMLAnchorElement>[P]
}
