import React, { useState } from 'react'
import { CheckCircle, Copy, RefreshCcw } from 'lucide-react'

const AdGenerator = () => {
  const [city, setCity] = useState('')
  const [generatedAd1, setGeneratedAd1] = useState('')
  const [generatedAd2, setGeneratedAd2] = useState('')
  const [copied1, setCopied1] = useState(false)
  const [copied2, setCopied2] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const template1 = `🔥 ${city} and Surrounding!\n\nWe Buy Iphone 11 & Newer\n\nNEW, USED, CRACKED, BLOCKED ${image ? `\n\n<img src="${image}" alt="Ad Image" style="max-width: 200px; max-height: 200px;" />` : ''}`
  const template2 = `📲 Hey (${city}) - 𝐖𝐞 𝐏𝐚𝐲 𝐂𝐚𝐬𝐡 𝐅𝐨𝐫 𝐏𝐡𝐨𝐧𝐞𝐬 📲\n\n🤝 𝑾𝒆 𝑩𝒖𝒚 𝑵𝑬𝑾, 𝑼𝑺𝑬𝑫, 𝑪𝑹𝑨𝑪𝑲𝑬𝑫\n\nMost conditions considered.\n\n💰 We can pay cash the same day!\n\n💰 We love buying more than one device from every person.\n\n${image ? `\n\n<img src="${image}" alt="Ad Image" style="max-width: 200px; max-height: 200px;" />` : ''}`

  const generateAds = async () => {
    setGeneratedAd1(template1)
    setGeneratedAd2(template2)
    setCopied1(false)
    setCopied2(false)
  }

  const copyToClipboard = (text: string, adNumber: number) => {
    try {
      navigator.clipboard.writeText(text)
      if (adNumber === 1) {
        setCopied1(true)
        setTimeout(() => setCopied1(false), 2000)
      } else {
        setCopied2(true)
        setTimeout(() => setCopied2(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy text: ', err)
      // Fallback to document.execCommand('copy')
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        const successful = document.execCommand('copy')
        if (!successful) {
          throw new Error('Failed to copy using execCommand')
        }
        if (adNumber === 1) {
          setCopied1(true)
          setTimeout(() => setCopied1(false), 2000)
        } else {
          setCopied2(true)
          setTimeout(() => setCopied2(false), 2000)
        }
      } catch (ex) {
        console.error('Fallback: Could not copy text: ', ex)
        alert('Failed to copy text. Please copy manually.')
      } finally {
        document.body.removeChild(textArea)
      }
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">iPhone Ad Generator</h1>
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
          City:
        </label>
        <input
          type="text"
          id="city"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Image:
        </label>
        <input
          type="file"
          id="image"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleImageUpload}
        />
        {image && <img src={image} alt="Uploaded" className="mt-2 max-h-32" />}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={generateAds}
      >
        Generate Ads <RefreshCcw size={16} className="inline-block ml-1" />
      </button>

      {generatedAd1 && (
        <div className="mt-6 border p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">Ad Copy 1</h2>
          <p className="text-gray-800 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: generatedAd1 }}></p>
          <button
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => copyToClipboard(generatedAd1, 1)}
          >
            {copied1 ? <CheckCircle size={16} className="inline-block mr-1" /> : <Copy size={16} className="inline-block mr-1" />}
            {copied1 ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

      {generatedAd2 && (
        <div className="mt-6 border p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">Ad Copy 2</h2>
          <p className="text-gray-800 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: generatedAd2 }}></p>
          <button
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => copyToClipboard(generatedAd2, 2)}
          >
            {copied2 ? <CheckCircle size={16} className="inline-block mr-1" /> : <Copy size={16} className="inline-block mr-1" />}
            {copied2 ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AdGenerator
