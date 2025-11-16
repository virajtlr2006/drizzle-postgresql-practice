import { FileQuestionMark } from 'lucide-react'
import { User } from 'lucide-react'
import { CircleQuestionMark } from 'lucide-react'
import { Bell } from 'lucide-react'

import React from 'react'

const Navbar = () => {
    
    return (
        <div>
            <header>
                <div>
                    <div>
                        <div>
                        </div>
                        <h2>PayApp</h2>
                    </div>
                    <nav>
                        <a href="#">Home</a>
                        <a href="#">Payments</a>
                        <a href="#">History</a>
                        <a href="#">Offers</a>
                    </nav>
                    <div>
                        {/* Notification */}
                        <button>
                            <span><Bell/></span>
                        </button>
                        {/* Help */}
                        <button>
                            <span><CircleQuestionMark/></span>
                        </button>
                        {/* User */}
                        <button>
                            <span><User/></span>
                        </button>

                    </div>
                </div>
            </header>

        </div>
    )
}

export default Navbar
