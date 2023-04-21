import { ReactNode } from 'react'
// @mui
import {
	Divider,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from '@mui/material'

export type componentItemType = {
	name: string
	Icon: ReactNode
	action?: Function
	divider?: boolean
}

export type Props = {
	open: boolean
	contextMenuPos: {
		mouseX: number
		mouseY: number
	}
	handleCloseContextMenu: (
		event: {},
		reason: 'backdropClick' | 'escapeKeyDown'
	) => void
	items: Array<componentItemType>
}

const ContextMenu = ({
	items,
	open,
	contextMenuPos,
	handleCloseContextMenu,
}: Props) => {
	return (
		<Menu
			open={open}
			onClose={handleCloseContextMenu}
			anchorReference="anchorPosition"
			anchorPosition={
				open
					? {
							left: contextMenuPos.mouseX,
							top: contextMenuPos.mouseY,
					  }
					: undefined
			}
		>
			{items.map((item, index) => {
				return (
					<div key={index}>
						<MenuItem
							onClick={item.action ? e => item.action(item.name) : undefined}
							disabled={item.action === undefined}
						>
							<ListItemIcon>{item.Icon}</ListItemIcon>
							<ListItemText>{item.name}</ListItemText>
						</MenuItem>
						{item.divider ? <Divider /> : null}
					</div>
				)
			})}
		</Menu>
	)
}

export default ContextMenu
