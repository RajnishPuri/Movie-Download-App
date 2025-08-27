import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ExternalLink, Play, Download, Film } from 'lucide-react'
import { getAllLinks, getIMDbLink, getTrailerLink } from '../services/streamingServices'

const StreamingLinks = ({ movie }) => {
  const { Title, Year, imdbID } = movie
  const { streaming, download } = getAllLinks(Title, Year)

  const handleLinkClick = (url, serviceName) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleLinkClick(getIMDbLink(imdbID), 'IMDb')}
              variant="outline"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on IMDb
            </Button>
            <Button
              onClick={() => handleLinkClick(getTrailerLink(Title, Year), 'YouTube Trailer')}
              variant="outline"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Streaming Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {streaming.map((service) => (
              <Button
                key={service.id}
                onClick={() => handleLinkClick(service.url, service.name)}
                variant="outline"
                className="justify-start h-auto p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Search for "{Title}"
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Free & Legal Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {download.map((service) => (
              <Button
                key={service.id}
                onClick={() => handleLinkClick(service.url, service.name)}
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{service.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {service.description}
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    Free
                  </Badge>
                </div>
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <CardContent className="pt-6">
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-medium mb-2">⚠️ Important Notice:</p>
            <ul className="space-y-1 text-xs">
              <li>• Links provided are for search purposes only</li>
              <li>• Always use legal streaming services and respect copyright</li>
              <li>• Availability varies by region and licensing agreements</li>
              <li>• This tool does not host or provide direct download links</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StreamingLinks

