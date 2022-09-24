import type { Object3D } from "three"

export const if$_instance_change = (
	inst: Object3D,
	our_parent: any,
	inst_uuid: string,
	// TODO  Remove `create`
	create: boolean,
	// TODO  Remove `inst_name`
	inst_name: string,
	comp_name: string,
	handler: () => void
): void => {
	// console.warn(`comp ${comp_name} > Something happened with the ${inst_name} instance!`)

	if (our_parent) {
		// it's free
		if (!inst.parent) {
			// console.warn(`comp ${comp_name} > ${inst_name} instance is free / was not added anywhere yet ...`)

			// applicable to checks below.
			handler()

			// DEPRECATED  -> handler can be called in both cases, keep code as reminder.
			/*
			// we have registered one already
			if (inst_uuid) {
				// console.warn(`comp ${comp_name} > ... we have already registered one before ...`)

				handler()

			
				// it's different than the registered one -> replace!
				if (inst_uuid !== inst.uuid) {
					// console.warn(
					// 	`comp ${comp_name} > ... it was a different one --> add it to 'our_parent' (after removing the old one from it's parent -> should be 'our_parent').`
					// )
					// console.info(`comp ${comp_name} > has uuid`, inst_uuid)
					// console.info(`comp ${comp_name} > got uuid`, inst.uuid)

					handler()
				}

				// it's the same one -> it was just created -> initialization
				else if (inst_uuid === inst.uuid) {
					// console.warn(`comp ${comp_name} > ... it was same one! -> shouldn't happen ?! ...`)

					// DEPRECATED  -> we don't need `create`, keep code as reminder.
					// if (create) {
					// 	console.warn(`comp ${comp_name} > ... it was created! that's where inst_uuid was set! that's why! -> initialization --> add it to 'our_parent.`)

					// 	handler()
					// } else {
					// 	console.warn(`comp ${comp_name} > ... it was not created, it was injected! that's why! -> initialization --> add it to 'our_parent.`)

					// 	handler()
					// }

					handler()
				}
			
			}

			// we haven't registered any yet -> initialization
			else if (!inst_uuid) {
				// console.warn(
				// 	`comp ${comp_name} > ... we haven't registered any yet -> initialization --> add it to 'our_parent.'`
				// )

				handler()
			}
			*/
		}

		// it's not free
		else if (inst.parent) {
			// const message: string[] = []

			// console.error(`comp ${comp_name} > ${inst_name} instance is not free / already has a parent!`)

			// it's already a child of our parent
			if (inst.parent === our_parent) {
				// message.push(`The instance ${inst_name} is already a child of 'our_parent'`)
				// console.error(`The instance ${inst_name} is already a child of 'our_parent' -> ?!`)

				// it's already a child of our parent, but we have registered one already
				if (inst_uuid) {
					// message.push(`. The component was already managing an instance `)
					// console.error(`comp ${comp_name} > ... we have already registered one before ...`)

					// it's different than the registered one -> ?!
					if (inst_uuid !== inst.uuid) {
						// message.push(`and it was a different one. `)

						if (inst.userData.svelthreeComponent !== self) {
							// message.push(`This one has been generated by another component! -> `)
							// message.push(`The instance '${inst_name}' you've provided will be removed / re-added while it's current managing component will be cleared of any references to it!`)

							// console.warn(`comp ${comp_name} > ${message.join("")}`)

							handler()
						}

						// cannot / shouldn't happen -> it cannot be a different one and being managed by this component at the same time.
						else if (inst.userData.svelthreeComponent === self) {
							throw Error(`comp ${comp_name} > if$_instance_change > THIS SHOULDN'T HAPPEN!`)
						}
					}

					// IMPORTANT  it's the same one -> happens on every component update!
					else if (inst_uuid === inst.uuid) {
						// message.push(`and it is the same one. -> we're here because ${inst_name} prop got updated! -> nothing / silent`)
						// console.warn(`comp ${comp_name} > ${message.join("")}`)
						// console.info(`comp ${comp_name} > has uuid`, inst_uuid)
						// console.info(`comp ${comp_name} > got uuid`, inst.uuid)
						// DO NOTHING / SILENT
					}
				}

				// it's already a child of our parent, but we haven't registered one yet -> initialization
				else if (!inst_uuid) {
					// message.push(`. We've already registered one before.`)
					// message.push(` The instance '${inst_name}' you've provided has already been added to the scene / some other instance in the scene and was created / is currently being managed by some other component!`)
					// message.push(` It will be removed / re-added while it's current managing component will be cleared of any references to it!`)

					// console.warn(`comp ${comp_name} > ${message.join("")}`)

					handler()
				}
			}

			// it has a different parent
			else if (inst.parent !== our_parent) {
				// message.push(` TThe instance ${inst_name} is not a child of 'our_parent'!`)
				// message.push(` The instance '${inst_name}' you've provided has already been added to the scene / some other instance in the scene and was created / is currently being managed by some other component!`)
				// message.push(` It will be removed / re-added while it's current managing component will be cleared of any references to it!`)

				// console.warn(`comp ${comp_name} > ${message.join("")}`, inst.parent)

				handler()
			}
		}
	} else {
		// IS ROOT SCENE!
		//console.warn(`SVELTHREE > component's 'our_parent' is 'undefined' this means the component is a 'root_scene' (direct child of the 'Canvas' component)`)
		// DO NOTHING / SILENT
	}
}
