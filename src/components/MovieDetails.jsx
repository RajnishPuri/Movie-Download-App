import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { ArrowLeft, Star, Calendar, Clock, Globe } from 'lucide-react'
import StreamingLinks from './StreamingLinks'

const MovieDetails = ({ movie, onBack }) => {
  if (!movie) return null

  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Ratings,
    imdbRating,
    imdbID,
    Type,
    BoxOffice
  } = movie

  console.log(Poster);

  const handleDownload = () => {
    document.getElementById('streaming-tab')?.click()
  }

  const handleStream = () => {
    document.getElementById('streaming-tab')?.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1">
              <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-muted">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{Title}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary">{Type}</Badge>
                  <Badge variant="outline">{Rated}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {Year}
                  </div>
                  {Runtime && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {Runtime}
                    </div>
                  )}
                  {imdbRating && imdbRating !== 'N/A' && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {imdbRating}/10
                    </div>
                  )}
                </div>
              </div>

              {Plot && Plot !== 'N/A' && (
                <div>
                  <h3 className="font-semibold mb-2">Plot</h3>
                  <p className="text-muted-foreground">{Plot}</p>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Movie Details</TabsTrigger>
              <TabsTrigger value="streaming" id="streaming-tab">Watch & Download</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {Genre && Genre !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Genre:</span>
                      <p className="text-muted-foreground">{Genre}</p>
                    </div>
                  )}
                  {Director && Director !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Director:</span>
                      <p className="text-muted-foreground">{Director}</p>
                    </div>
                  )}
                  {Writer && Writer !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Writer:</span>
                      <p className="text-muted-foreground">{Writer}</p>
                    </div>
                  )}
                  {Actors && Actors !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Cast:</span>
                      <p className="text-muted-foreground">{Actors}</p>
                    </div>
                  )}
                  {Language && Language !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Language:</span>
                      <p className="text-muted-foreground">{Language}</p>
                    </div>
                  )}
                  {Country && Country !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Country:</span>
                      <p className="text-muted-foreground">{Country}</p>
                    </div>
                  )}
                  {Released && Released !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Released:</span>
                      <p className="text-muted-foreground">{Released}</p>
                    </div>
                  )}
                  {BoxOffice && BoxOffice !== 'N/A' && (
                    <div>
                      <span className="font-semibold">Box Office:</span>
                      <p className="text-muted-foreground">{BoxOffice}</p>
                    </div>
                  )}
                  {Awards && Awards !== 'N/A' && (
                    <div className="sm:col-span-2">
                      <span className="font-semibold">Awards:</span>
                      <p className="text-muted-foreground">{Awards}</p>
                    </div>
                  )}
                </div>

                {Ratings && Ratings.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Ratings</h3>
                    <div className="flex flex-wrap gap-2">
                      {Ratings.map((rating, index) => (
                        <Badge key={index} variant="outline">
                          {rating.Source}: {rating.Value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="streaming" className="mt-6">
              <StreamingLinks movie={movie} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovieDetails

