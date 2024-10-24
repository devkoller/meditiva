import { useState } from "react"
import { Header } from "./header/Header"
import { SideMenu } from "./sideMenu/SideMenu"
import { MobileMenu } from "./sideMenu/MobileMenu"

export const AuthWrapper = ({ children }) => {
	const [showMobileMenu, setShowMobileMenu] = useState(false)

	const handleShowMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu)
	}

	return (
		<>
			<div className="w-full h-full relative overflow-y-scroll">
				<Header openPanel={handleShowMobileMenu} />
				<div className="flex max-w-screen  min-h-screen">
					<SideMenu />
					<div className="p-3 bg-slate-50 w-10/12">{children}</div>
				</div>
			</div>
			{showMobileMenu && <MobileMenu closePanel={handleShowMobileMenu} />}
		</>
	)
}
