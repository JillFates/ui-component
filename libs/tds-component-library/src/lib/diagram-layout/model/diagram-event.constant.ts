
export const enum DiagramEvent {
	ANIMATION_FINISHED = 'AnimationFinished',
	BACKGROUND_SINGLE_CLICKED = 'BackgroundSingleClicked',
	BACKGROUND_DOUBLE_CLICKED = 'BackgroundDoubleClicked',
	BACKGROUND_CONTEXT_CLICKED = 'BackgroundContextClicked',
	OBJECT_SINGLE_CLICKED = 'ObjectSingleClicked',
	OBJECT_DOUBLE_CLICKED = 'ObjectDoubleClicked',
	OBJECT_CONTEXT_CLICKED = 'ObjectContextClicked',
	INITIAL_LAYOUT_COMPLETED = 'InitialLayoutCompleted',
	INITIAL_ANIMATION_STARTING = 'InitialAnimationStarting',
	LAYOUT_COMPLETED = 'LayoutCompleted'
}

export const enum DiagramEventAction {
	ANIMATION_FINISHED = 'diagram:AnimationFinished',
	NODE_MOVE_ANIMATION_FINISHED = 'diagram:NodeMoveAnimationFinished'
}
