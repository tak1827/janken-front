import gql from 'graphql-tag'

export const GET_ALL_NFT = gql`
  query GET_ALL_NFT {
    fetchAllNFTs {
      tokenId,
        owner,
        image,
        name,
        description,
    }
  }
`

export const GET_OWNER_NFT = gql`
  query GET_OWNER_NFT ($address: String!) {
    fetchNFTsByOwner (owner: $address) {
        tokenId,
        owner,
        image,
        name,
        description,
    }
  }
`

export const GET_NFT_DETAIL = gql`
  query GET_NFT_DETAIL ($tokenId: String!) {
    fetchNFT (tokenId: $tokenId) {
        tokenId,
        owner,
        image,
        name,
        description,
    }
  }
`

export const GET_OFFERS = gql`
  query GET_OFFERS ($address: String!) {
    fetchOffers (address: $address) {
      offerId,
      status,
      offerorNFT {
        tokenId,
        owner,
        image,
        name,
        description
      },
      offereeNFT {
        tokenId,
        owner,
        image,
        name,
        description
      },
      offereeHands,
      offerorHands
      drawPoint,
      winner,
    }
  }
`


export const GET_ALL_UPLOAD_FILE = gql`
  query GET_ALL_UPLOAD_FILE {
    fetchUploads {
        uri,
        filename,
        mimetype,
        encoding
    }
  }
`


export const MINT_NFT = gql`
  mutation MINT_NFT ($owner: String!, $image: String, $name: String, $description: String) {
    postMintNFT(input: {owner: $owner, image: $image, name: $name, description: $description}) {
      txHash
    }
  }
`

export const UPLOAD_IMAGE = gql`
  mutation UPLOAD_IMAGE ($photo: Upload!) {
    postUploadImage(file: $photo) {
      uri,
      filename,
      mimetype,
      encoding
    }
  }
`