/**
 * @author Vatroslav Vrbanic @see https://github.com/vatro
 */

import type { OrthographicCamera, PerspectiveCamera, Scene } from "three"
import { CameraHelper } from "three"
import { CameraValues } from "../constants"

export default class CameraUtils {
	// #region --- Orthographic Camera

	public static getOrthoCamDefaultParams(frustumSize: number): ConstructorParameters<typeof OrthographicCamera> {
		const _frustumSize = frustumSize || CameraValues.CAM_ORTHO_FRUSTUM_SIZE
		const _aspect = CameraValues.CAM_ORTHO_ASPECT
		const _near = CameraValues.CAM_ORTHO_NEAR
		const _far = CameraValues.CAM_ORTHO_FAR

		const left = (_frustumSize * _aspect) / -2
		const right = (_frustumSize * _aspect) / 2
		const top = _frustumSize / 2
		const bottom = _frustumSize / -2

		return [left, right, top, bottom, _near, _far]
	}

	/**
	 * Updates OrthographicCamera's `projectionMatrix` on canvas aspect change.
	 */
	public static updateOtrhoCam(cam: OrthographicCamera, frustumSize: number, canvasW: number, canvasH: number): void {
		//console.info("SVELTHREE > CameraUtils : updateOtrhoCam!")

		// AUTO only
		// no props, no params, cam has been created by using defaultParams
		// if user provided frustumSize that will / is being used, otherwise default
		// if user has provided aspect that will be used, not the actual aspect (someone might need it like that)

		// adding frustumSize attribute enters auto modus, where frustum planes are being calculated depending on current canvas size / aspect
		if (frustumSize) {
			//const _aspect = aspect || canvasW / canvasH
			const aspect = canvasW / canvasH

			// abilty to have (blank)
			//const _frustumSize = frustumSize || CameraValues.CAM_ORTHO_FRUSTUM_SIZE

			let left = (frustumSize * aspect) / -2
			let right = (frustumSize * aspect) / 2
			let top = frustumSize / 2
			let bottom = frustumSize / -2

			cam.left = left
			cam.right = right
			cam.top = top
			cam.bottom = bottom

			cam.updateProjectionMatrix()
		}

		// If has provided props or has created cam using params --> No effect!
		// - using params: cam.left, .right etc. are available / will be updated by props if inside
		// - defaultParams (blank): cam.left, .right etc. are available  / will be updated by props if inside
	}

	/**
	 * Logs a warning if user is providing 'frustumSize' and at the same time tries to define frustum planes via 'props' attribute.
	 */
	public static logOrthoCamFrustumWarnings(left: number, right: number, top: number, bottom: number) {
		const prefix = "SVELTHREE > Camera / OrthographicCamera : Using 'frustumSize' and "
		const suffix = " prop can lead to undesired effects! "

		left ? console.warn(`${prefix}'left'${suffix}`) : null
		right ? console.warn(`${prefix}'right'${suffix}`) : null
		top ? console.warn(`${prefix}'top'${suffix}`) : null
		bottom ? console.warn(`${prefix}'bottom'${suffix}`) : null
	}

	// #endregion

	// #region --- PerspectiveCamera Camera

	/**
	 * Updates PerspectiveCamera's `projectionMatrix` on canvas aspect change.
	 */
	public static updatePerspCam(cam: PerspectiveCamera, canvasW: number, canvasH: number): void {
		cam.aspect = canvasW / canvasH
		cam.updateProjectionMatrix()
	}

	// #endregion

	/**
	 * Creates a CameraHelper.
	 */
	public static createHelper(cam: OrthographicCamera | PerspectiveCamera, scene: Scene): void {
		const camHelper = new CameraHelper(cam)

		cam.userData.helper = camHelper
		CameraUtils.updateHelper(cam)

		scene.add(camHelper)
		camHelper.visible = true

		console.info("SVELTHREE > " + cam.type + " HELPER added!", {
			camHelper: camHelper,
			scene: scene,
			total: scene.children.length
		})
	}

	/**
	 * Syncs Camera and CameraHelper.
	 */
	public static updateHelper(cam: OrthographicCamera | PerspectiveCamera): void {
		if (cam.userData.helper) {
			// updates appearance / elements
			cam.userData.helper.update()

			// updates matrix (position, rotation, scale)
			// this approach is bulletproof for all scene / matrix update modes.
			cam.userData.helper.matrix.copy(cam.matrix)
			cam.userData.helper.matrixWorld.copy(cam.matrixWorld)
		}
	}

	public static removeHelper(cam: OrthographicCamera | PerspectiveCamera, scene: Scene): void {
		if (cam.userData.helper) {
			scene.remove(cam.userData.helper)
			cam.userData.helper = null
		}
	}
}