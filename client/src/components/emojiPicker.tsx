'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
}

export const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button type="button" onClick={() => setIsOpen(!isOpen)} size="sm">
        {isOpen ? 'Close' : 'Pick Emoji'}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2">
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              onSelect(emoji.native)
              setIsOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
