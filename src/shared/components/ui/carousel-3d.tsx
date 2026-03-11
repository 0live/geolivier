import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/components/ui/carousel"
import { cn } from "@/shared/lib/utils"

interface Carousel3DProps {
  items: React.ReactNode[]
  className?: string
  itemClassName?: string
}

export function Carousel3D({ items, className, itemClassName }: Carousel3DProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index)
    if (api) api.scrollTo(index)
  }

  const handlePrevious = () => {
    if (!api) return
    const newIndex = selectedIndex === 0 ? items.length - 1 : selectedIndex - 1
    setSelectedIndex(newIndex)
    api.scrollTo(newIndex)
  }

  const handleNext = () => {
    if (!api) return
    const newIndex = selectedIndex === items.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(newIndex)
    api.scrollTo(newIndex)
  }

  const activeItem = items[selectedIndex]

  return (
    <div className={cn("w-full flex flex-col gap-8", className)}>
      {/* Thumbnail track (Fixed display on top) */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-[calc(100%-4rem)] max-w-xl mx-auto"
      >
        <CarouselContent className="items-center -ml-2 py-4">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "pl-2 basis-[22%] sm:basis-[18%] lg:basis-[15%] shrink-0 transition-all duration-300 cursor-pointer relative",
                selectedIndex === index ? "scale-100 z-10" : "opacity-50 hover:opacity-100 scale-90",
                itemClassName
              )}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="aspect-square w-full rounded-md overflow-hidden bg-muted/20 flex items-center justify-center">
                {React.isValidElement(item) 
                  ? React.cloneElement(item as React.ReactElement<{ className?: string }>, {
                      className: cn((item as React.ReactElement<{ className?: string }>).props.className, "w-full h-full object-cover transition-transform hover:scale-110")
                    })
                  : item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          onClick={handlePrevious}
          disabled={false}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10" 
        />
        <CarouselNext 
          onClick={handleNext}
          disabled={false}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10" 
        />
      </Carousel>

      {/* Active Image (Dynamic display at the bottom) */}
      <div className="w-full relative rounded-2xl bg-muted/5 flex items-center justify-center flex-col gap-4 overflow-hidden h-[50vh] min-h-[400px] max-h-[600px]">
        <div className="w-full h-full flex items-center justify-center p-4">
          {React.isValidElement(activeItem) 
            ? React.cloneElement(activeItem as React.ReactElement<{ className?: string }>, {
                className: cn((activeItem as React.ReactElement<{ className?: string }>).props.className, "w-auto h-auto max-w-full max-h-full object-contain drop-shadow-lg")
              })
            : activeItem}
        </div>
      </div>
    </div>
  )
}
