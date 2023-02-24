import React, { useEffect, useRef, useState } from 'react'
import style from './select.module.css'

export type SelectOptions = {
  label: string
  value: string | number
}

type MultipleSelectProps = {
  multiple: true
  value: SelectOptions[]
  onChange: (value: SelectOptions[] | undefined) => void
}

type SingleSelectProps = {
  multiple?: false
  value?: SelectOptions
  onChange: (value: SelectOptions | undefined) => void
}

type SelectProps = {
  options: SelectOptions[]
} & (SingleSelectProps | MultipleSelectProps)

export const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedindex, setHighlightedindex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option: SelectOptions) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) {
        onChange(option)
      }
    }
  }

  const isOptionSelected = (option: SelectOptions) => {
    return multiple ? value?.includes(option) : option === value
  }

  useEffect(() => {
    isOpen && setHighlightedindex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev)
          if (isOpen) selectOption(options[highlightedindex])
          break
        case 'ArrowUp':
        case 'ArrowDown': 
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          const newValue = highlightedindex + (e.code === 'ArrowDown' ? 1 : -1)
          if(newValue >= 0 && newValue < options.length){
            setHighlightedindex(newValue)
          }
          break
          
          case 'Escape':
             setIsOpen(false)

      }
    }
    containerRef.current?.addEventListener('keydown', handler)

    return () => {
      containerRef.current?.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlightedindex])

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className={style.container}
      tabIndex={0}
    >
      <span className={style.value}>
        {multiple
          ? value?.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation()
                  selectOption(v)
                }}
                className={style['option-badge']}
              >
                {v.label}
                <span className={style['remove-btn']}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          clearOptions()
          e.stopPropagation()
        }}
        className={style['clear-btn']}
      >
        &times;
      </button>
      <div className={style.divider}></div>
      <div className={style.caret}></div>
      <ul className={`${style.options} ${isOpen ? style.show : ''}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => setHighlightedindex(index)}
            key={option.label}
            className={`${style.option} ${
              isOptionSelected(option) ? style.selected : ''
            } ${index === highlightedindex ? style.highlighted : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
