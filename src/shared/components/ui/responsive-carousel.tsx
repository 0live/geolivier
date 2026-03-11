import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"
import { Carousel3D } from "./carousel-3d"
import { useMediaQuery } from "@/shared/hooks/use-media-query"
import { cn } from "@/shared/lib/utils"

interface ResponsiveCarouselProps {
  items: React.ReactNode[]
  className?: string
  itemClassName?: string
}

export function ResponsiveCarousel({ items, className, itemClassName }: ResponsiveCarouselProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <Carousel3D items={items} className={className} itemClassName={itemClassName} />
  }

  return (
    <div className={cn("w-full max-w-sm mx-auto", className)}>
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6 bg-muted/20 rounded-xl overflow-hidden">
                   {React.isValidElement(item) 
                    ? React.cloneElement(item as React.ReactElement<{ className?: string }>, {
                        className: cn((item as React.ReactElement<{ className?: string }>).props.className, "w-full h-full object-cover")
                      })
                    : item}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}
