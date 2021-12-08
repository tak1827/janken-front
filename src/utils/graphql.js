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
  query GET_OFFERS ($address: String!, $type: String!) {
    fetchOffers (address: $address, type: $type) {
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

export const GET_BATTLES = gql`
  query GET_BATTLES ($address: String!) {
    fetchBattles (address: $address) {
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
      offeror,
      offeree
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

export const MAKE_OFFER = gql`
  mutation MAKE_OFFER (
    $offerId: Int!
    $offeror: String,
    $offeree: String,
    $offerorNFTTokenId: String,
    $offereeNFTTokenId: String,
    $offerorHands: [Int!],
    $drawPoint: Int
  ) {
    postMakeOffer(input: {
      offerId: $offerId,
      offeror: $offeror,
      offeree: $offeree,
      offerorNFTTokenId: $offerorNFTTokenId,
      offereeNFTTokenId: $offereeNFTTokenId,
      offerorHands: $offerorHands,
      drawPoint: $drawPoint
    }) {
      status
    }
  }
`

export const ACCEPT_OFFER = gql`
  mutation ACCEPT_OFFER (
    $offerId: Int!,
    $offereeHands: [Int!],
  ) {
    postAcceptOffer(input: {
      offerId: $offerId,
      offereeHands: $offereeHands,
    }) {
      status
    }
  }
`

export const DECLINE_OFFER = gql`
  mutation DECLINE_OFFER (
    $offerId: Int!
  ) {
    postDeclineOffer(input: {
      offerId: $offerId,
    }) {
      status
    }
  }
`