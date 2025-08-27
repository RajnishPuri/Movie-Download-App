import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Calendar, Star, Info } from 'lucide-react'
import { useState } from 'react'

const MovieCard = ({ movie, onViewDetails }) => {
  const { Title, Year, Poster, Type, imdbID } = movie
  const [imgError, setImgError] = useState(false);

  return (
    <Card className="relative z-1 w-full max-w-sm mx-auto movie-card-hover fade-in group">
      <CardHeader className="pb-2">
        <div className="aspect-[2/3] relative overflow-hidden rounded-md bg-muted group">
          {Poster && Poster !== "N/A" && !imgError ? (
            <img
              src={Poster}
              alt={Title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted">
              No Image
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardTitle className="text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
          {Title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span>{Year}</span>
        </div>
        <Badge variant="secondary" className="capitalize">
          {Type}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onViewDetails(imdbID)}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          variant="outline"
        >
          <Info className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MovieCard

