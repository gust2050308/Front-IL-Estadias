import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function InkInUse() {    
    return (
        <div>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNhcnVzZWx8ZW58MHx8fHwxNjY5NTQ1NzA3&ixlib=rb-1.2.1&q=80&w=400" alt=""/>
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNhcnVzZWx8ZW58MHx8fHwxNjY5NTQ1NzA3&ixlib=rb-1.2.1&q=80&w=400" alt=""/>
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNhcnVzZWx8ZW58MHx8fHwxNjY5NTQ1NzA3&ixlib=rb-1.2.1&q=80&w=400" alt=""/>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
